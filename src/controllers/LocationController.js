// Banco em memoria
let locations = [];

// Listar todas as localizações 
export function getAllLocations(req, res) {
    try {
        res.json(locations);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar localizações",
            error: error.message
        })
    }
}

export function createLocation(req, res) {
    try {
        const { name, latitude, longitude, address } = req.body;

        if (!name || !latitude || !longitude ) {
            return res.status(400).json({
                message: "Nome, latitude e longitude são obrigatórios"
            })
        }

        const newLocation = {
            id: locations.length + 1,
            name,
            latitude,
            longitude,
            address
        };

        locations.push(newLocation);
        res.status(201).json({
            message: "Localização criada com sucesso",
            location: newLocation
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar localização",
            error: error.message
        })
    }
}

export function deleteLocation(req, res) {
    try {
        const { id } = req.params;
        const locationIndex = locations.findIndex(loc => loc.id === parseInt(id));
    } catch (error) {
        res.status(500).json({
            message: "Erro ao deletar localização",
            error: error.message
        })
    }
}