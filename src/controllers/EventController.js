import Event from "../models/EventModels.js";

export async function getAllEvents(req, res) {
  try {
    const events = await Event.find().populate("category location");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar eventos", error: error.message });
  }
}

export async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id).populate("category location");
    if (!event) return res.status(404).json({ message: "Evento não encontrado" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar evento", error: error.message });
  }
}

export async function createEvent(req, res) {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Evento criado com sucesso!", event });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar evento", error: error.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Evento não encontrado" });
    res.json({ message: "Evento atualizado com sucesso!", event });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar evento", error: error.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Evento não encontrado" });
    res.json({ message: "Evento excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir evento", error: error.message });
  }
}
