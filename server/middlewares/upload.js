import busboy from "busboy";
import { storage, ID, InputFile } from "../utils/appwriteclient.js";

const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

const uploadMiddleware = (req, res, next) => {
  console.log("=== BUSBOY UPLOAD MIDDLEWARE START ===");
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Content-Length:", req.headers["content-length"]);
  console.log("User-Agent:", req.headers["user-agent"]);

  // Enhanced validation
  if (
    !req.headers["content-type"] ||
    !req.headers["content-type"].includes("multipart/form-data")
  ) {
    return res.status(400).json({
      success: false,
      error: "Content-Type must be multipart/form-data",
    });
  }

  // Check content length
  const contentLength = parseInt(req.headers["content-length"] || "0");
  if (contentLength === 0) {
    return res.status(400).json({
      success: false,
      error: "Request body is empty",
    });
  }

  if (contentLength > 50 * 1024 * 1024) {
    // 50MB total limit
    return res.status(400).json({
      success: false,
      error: "Request too large. Maximum total size is 50MB.",
    });
  }

  console.log(`Processing ${contentLength} bytes of form data...`);

  const files = [];
  const fields = {};
  const imageUrls = [];

  // Create busboy instance
  const bb = busboy({
    headers: req.headers,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB per file
      files: 5, // Maximum 5 files
      fieldSize: 1024 * 1024, // 1MB for text fields
      fields: 20, // Maximum 20 form fields
    },
  });

  // Handle form fields
  bb.on("field", (fieldname, value) => {
    console.log(`Field: ${fieldname} = ${value}`);
    fields[fieldname] = value;
  });

  // Handle file uploads
  bb.on("file", (fieldname, file, info) => {
    const { filename, encoding, mimeType } = info;

    console.log(
      `File upload started: ${fieldname} - ${filename} - ${mimeType}`
    );

    // Validate field name
    if (fieldname !== "images") {
      console.error(`Invalid field name: ${fieldname}. Expected 'images'`);
      file.resume(); // Discard the file
      return;
    }

    // Validate file type
    if (!mimeType.startsWith("image/")) {
      console.error(`Invalid file type: ${mimeType}. Only images allowed`);
      file.resume(); // Discard the file
      return;
    }

    // Collect file data
    const chunks = [];

    file.on("data", (chunk) => {
      chunks.push(chunk);
    });

    file.on("end", () => {
      const buffer = Buffer.concat(chunks);
      console.log(`File received: ${filename} (${buffer.length} bytes)`);

      files.push({
        fieldname,
        originalname: filename,
        encoding,
        mimetype: mimeType,
        buffer,
        size: buffer.length,
      });
    });

    file.on("error", (err) => {
      console.error(`File stream error for ${filename}:`, err);
    });
  });

  // Handle busboy errors
  bb.on("error", (err) => {
    console.error("Busboy error:", err);
    // Don't immediately fail - busboy can recover from some errors
    // The 'close' event will still fire and we can check if we got any data
  });

  // Handle completion
  bb.on("close", async () => {
    console.log("=== BUSBOY PARSING COMPLETE ===");
    console.log(`Files received: ${files.length}`);
    console.log(`Fields received:`, Object.keys(fields));

    // Check if we got at least some form data
    if (files.length === 0 && Object.keys(fields).length === 0) {
      console.error("No form data received - request may be malformed");
      if (!res.headersSent) {
        return res.status(400).json({
          success: false,
          error: "No form data received. Check your request format.",
          details:
            "Make sure you're sending multipart/form-data with proper fields",
        });
      }
      return;
    }

    try {
      // Upload files to Appwrite
      if (files.length > 0) {
        console.log(`Uploading ${files.length} files to Appwrite...`);

        for (const file of files) {
          try {
            console.log(
              `Processing: ${file.originalname} (${(file.size / 1024).toFixed(
                2
              )}KB)`
            );

            const fileId = ID.unique();

            // Create InputFile from buffer
            const inputFile = InputFile.fromBuffer(
              file.buffer,
              file.originalname
            );

            // Upload to Appwrite
            const uploadedFile = await storage.createFile(
              BUCKET_ID,
              fileId,
              inputFile
            );

            // Generate public URL
            const imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

            imageUrls.push(imageUrl);
            console.log(
              `✅ Uploaded: ${file.originalname} -> ${uploadedFile.$id}`
            );
          } catch (uploadError) {
            console.error(
              `❌ Failed to upload ${file.originalname}:`,
              uploadError.message
            );
          }
        }
      }

      // Attach parsed data to request
      req.body = fields;
      req.files = files;
      req.images = imageUrls;

      console.log("=== UPLOAD COMPLETE ===");
      console.log(`Successfully uploaded ${imageUrls.length} images`);

      next();
    } catch (error) {
      console.error("Appwrite processing error:", error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: "Failed to upload to storage",
          details: error.message,
        });
      }
    }
  });

  // Set timeout
  const timeout = setTimeout(() => {
    console.error("Upload timeout after 60 seconds");
    if (!res.headersSent) {
      res.status(408).json({
        success: false,
        error: "Upload timeout",
      });
    }
  }, 60000);

  // Clean up timeout when response is finished
  res.on("finish", () => {
    clearTimeout(timeout);
  });

  // Pipe request to busboy
  req.pipe(bb);
};

export default uploadMiddleware;
