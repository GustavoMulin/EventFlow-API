import Location from "../models/LocationModels.js";

export async function getAllLocations(req, res) {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar locais", error: error.message });
  }
}

export async function createLocation(req, res) {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json({ message: "Local criado com sucesso!", location });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar local", error: error.message });
  }
}

export async function updateLocation(req, res) {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) return res.status(404).json({ message: "Local não encontrado" });
    res.json({ message: "Local atualizado com sucesso!", location });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar local", error: error.message });
  }
}

export async function deleteLocation(req, res) {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: "Local não encontrado" });
    res.json({ message: "Local excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir local", error: error.message });
  }
}
