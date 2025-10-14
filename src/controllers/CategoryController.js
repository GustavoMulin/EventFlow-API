import Category from "../models/CategoryModels.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categorias", error: error.message });
  }
}

export async function createCategory(req, res) {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: "Categoria criada com sucesso!", category });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar categoria", error: error.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });
    res.json({ message: "Categoria atualizada com sucesso!", category });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar categoria", error: error.message });
  }
}

export async function deleteCategory(req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });
    res.json({ message: "Categoria excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir categoria", error: error.message });
  }
}
