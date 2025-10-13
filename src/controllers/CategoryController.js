// Banco na memória
let categories = [];

export function getAllCategories(res, req) {
    try {
        res.json(categories);
    } catch (error) {
        res.status(500).json({ 
            message: "Erro as listar as categorias", 
            error: error.message
        });
    }
}

export function createCategory(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ 
                message: "Nome da categoria é obrigatório" 
            });
        }

        const newCategory = {
            id: categories.length + 1,
            name
        };

        categories.push(newCategory);
        res.status(201).json({
            message: "Categoria criada com sucesso",
            category: newCategory
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar a categoria",
            error: error.message
        })
    }
}

export function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const categoryIndex = categories.findIndex(c => c.id === parseInt(id));

        if (categoryIndex === -1) {
            return res.status(404).json({
                message: "Categoria não encontrada"
            })
        }

        categories[categoryIndex].name = name || categories[categoryIndex].name;
        res.json({
            message: "Categoria atualizada com sucesso",
            category: categories[categoryIndex]
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar a categoria",
            error: error.message
        })
    }
}

export function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const categoryIndex = categories.findIndex(c => c.id === parseInt(id));

        if (categoryIndex === -1) {
            return res.status(404).json({
                message: "Categoria não encontrada"
            })
        }

        categories.splice(categoryIndex, 1);
        res.json({
            message: "Categoria deletada com sucesso"
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao deletar a categoria",
            error: error.message
        })
    }
}