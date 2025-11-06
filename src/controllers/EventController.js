import Event from "../models/EventModels.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar eventos", error });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar evento", error });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { name, description, date, price, latitude, longitude } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const event = new Event({
      name,
      description,
      date,
      price,
      image: imagePath,
      latitude,
      longitude,
    });

    await event.save();
    res.status(201).json({ message: "Evento criado com sucesso", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar evento", error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const event = await Event.findByIdAndUpdate(id, updatedData, { new: true });

    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.json({ message: "Evento atualizado com sucesso", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar evento", error });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    console.log("DELETE /api/events/:id called. params:", req.params, "user:", req.user?.id);
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      console.log("DELETE -> event not found", id);
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    if (event.image) {
      const imagePath = event.image.startsWith("/") ? event.image.slice(1) : event.image;
      const possible1 = path.join(process.cwd(), imagePath);
      const possible2 = path.join(process.cwd(), "src", imagePath);
      let filePath = null;
      if (fs.existsSync(possible1)) filePath = possible1;
      else if (fs.existsSync(possible2)) filePath = possible2;

      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) console.warn("DELETE -> couldn't remove file:", filePath, err.message);
          else console.log("DELETE -> removed file:", filePath);
        });
      } else {
        console.log("DELETE -> image file not found on disk:", imagePath, possible1, possible2);
      }
    }

    await Event.findByIdAndDelete(id);
    console.log("DELETE -> event removed from DB:", id);
    return res.json({ message: "Evento excluído com sucesso" });
  } catch (error) {
    console.error("DELETE -> error:", error);
    return res.status(500).json({ message: "Erro ao excluir evento", error: error.message });
  }
};


export { upload };
