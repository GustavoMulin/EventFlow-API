// Banco em memória
let events = [];

// Criar novo evento
export function createEvent(req, res) {
    try {
        const { name, description, date, time, price, category, location, image } = req.body;

        if (!name || !date || !category || !location) {
           return res.status(400).json({
            message: "Preencha todos os campos obrigatórios!"
           }) 
        }

        const newEvent = {
            id: events.length + 1,
            name,
            description,
            date,
            time,
            price,
            category,
            location,
            image
        };

        events.push(newEvent);
        res.status(201).json({
            message: `Evento ${name} criado com sucesso!`,
            event: newEvent
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar evento.",
            error: error.message
        })
    }
}

// Listar todos os eventos
export function getAllEvents(req, res) {
    try {
        res.json(events)
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar eventos.",
            error: error.message
        })
    }
}

// Buscar evento por ID
export function getEventById(req, res) {
    try {
        const { id } = req.params;
        const event = events.find(e => e.id === parseInt(id));

        if (!event) return res.status(404).json({
            message: "Evento não encontrado."
        })

        res.json(event);

    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar evento.",
            error: error.message
        })
    }
}


// Atualizar evento
export function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const eventIndex = events.findIndex(e => e.id === parseInt(id));

        if (eventIndex === -1) {
            return res.status(404).json({
                message: "Evento não encontrado."
            })
        }

        events[eventIndex] = { ...events[eventIndex], ...req.body };
        res.json({
            message: "Evento atualizado com sucesso!",
            event: events[eventIndex]
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar evento.",
            error: error.message
        })
    }
}

// Deletar evento
export function deleteEvent(req, res) {
    try {
        const { id } = req.params;
        const eventIndex = events.findIndex(e => e.id === parseInt(id));

        if (eventIndex === -1) {
            res.status(404).json({
                message: "Evento não encontrado."
            })
        }

        events.splice(eventIndex, 1);
        res.json({
            message: "Evento deletado com sucesso!"
        })
    } catch (error) {
        res.status(500).json({
            message: "Erro ao deletar evento.",
            error: error.message
        })
    }
}