exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400), send("No file uploaded");
    }

    const imageUrl = req.file.location;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.log(error("Error uploading image", error));
    res.status(500).send("Error uploading image");
  }
};
