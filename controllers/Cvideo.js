exports.uploadVideo = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No video uploaded");
    }

    const videoUrl = req.file.location;
    res.status(200).json({ message: "Video uploaded successfully", videoUrl });
  } catch (error) {
    console.log("Error uploading video", error);
    res.status(500).send("Error uploading video");
  }
};
