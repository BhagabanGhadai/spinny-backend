const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("my-moto-finder");

exports.UPLOAD_VIDEO = async () => {
    try{
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
        let video_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        blobStream.end(req.file.buffer);
        return video_url
    })
} catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
}