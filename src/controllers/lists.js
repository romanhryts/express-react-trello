const List = require('../models/List');
const Card = require('../models/Card');

class ListsController {
    static async postLists(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).send({ message: 'Provide list name' });
            }
            const list = await new List({ name, cards: [] });
            await list.save();
            return res.send({ message: 'Success', data: list });
        } catch (e) {
            return res.status(500).send({ message: 'Fail', error: e.message });
        }
    }

    static async getLists(req, res) {
        try {
            const lists = await List.find().sort({ updatedAt: -1 }).populate('cards');
            if (!lists.length) {
                return res.send({ message: 'Lists not found', data: [] });
            }
            return res.send({ message: 'Success', data: lists });
        } catch (e) {
            res.status(500).send({ message: 'Fail', error: e.message });
        }
    }

    static async deleteList(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send({ message: 'Please provide id' });
            }
            const list = await List.findByIdAndDelete(id);
            if (list.cards.length) {
                for (let card of list.cards) {
                    await Card.findByIdAndDelete(card);
                }
            }
            return res.send({ message: 'Success', id });
        } catch (e) {
            res.status(500).send({ message: 'Fail', error: e.message });
        }
    }
}

module.exports = ListsController;