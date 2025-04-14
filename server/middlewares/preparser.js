import busboy from "busboy";
import { Readable } from "stream";

const preParseForm = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (!contentType.startsWith("multipart/form-data")) return next();

  const chunks = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    const buffer = Buffer.concat(chunks);
    const bb = busboy({ headers: req.headers });
    const fields = {};

    bb.on("field", (name, val) => {
      fields[name] = val;
    });

    bb.on("finish", () => {
      req.body = fields;

      // Re-initialize the request stream
      const newStream = Readable.from(buffer);
      req._read = newStream._read.bind(newStream);
      req.read = newStream.read.bind(newStream);
      req.on = newStream.on.bind(newStream);
      req.once = newStream.once.bind(newStream);
      req.emit = newStream.emit.bind(newStream);
      req.pipe = newStream.pipe.bind(newStream);

      next();
    });

    bb.end(buffer);
  });

  req.on("error", (err) => {
    console.error("Pre-parser error:", err);
    res.status(500).send("Failed to parse form fields.");
  });
};

export default preParseForm;
