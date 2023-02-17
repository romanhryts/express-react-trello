const List = require('../models/List');
const Card = require('../models/Card');

class CardController {
    static async deleteCard(req, res) {
        try {
            const { id } = req.params;
            const { listID } = req.query;
            if (!id || !listID) {
                return res.status(400).send({ message: 'Please provide id and listID' });
            }

            await Card.findByIdAndDelete(id);
            const list = await List.findById(listID);
            list.cards = list.cards.filter(card => card.toString() !== id);
            await list.save();
            return res.send({ message: 'Success', id });

        } catch (e) {
            return res.status(500).send({ message: 'Fail', error: e.message });
        }
    }

    static async postCard(req, res) {
        try {
            const { name, listID } = req.body;
            if (!name || !listID) {
                return res.status(400).send({ message: 'Provide name and listID' });
            }

            const list = await List.findById(listID);
            if (!list) {
                return res.status(404).send({ message: 'List not found' });
            }

            const card = await new Card({ name, listID }).save();
            list.cards.push(card._id);

            await list.save();
            return res.send({ message: 'Success', data: card });
        } catch (e) {
            return res.status(500).send({ message: 'Fail', error: e.message });
        }
    }

    static async putCardName(req, res) {
        try {
            const { name, id } = req.body;
            if (!name || !id) {
                return res.status(400).send({ message: 'Provide name and id' });
            }
            const card = await Card.findByIdAndUpdate(id, { name }, { returnOriginal: false });
            return res.send({ message: 'Success', data: card });
        } catch (e) {
            return res.status(500).send({ message: 'Fail', error: e.message });
        }
    }

    static async putCardStatus(req, res) {
        try {
            const { previousListID, listID, id } = req.body;
            if (!id || !listID || !previousListID) {
                return res.status(400).send({ message: 'Provide name, listID and previousListID' });
            }

            const prevList = await List.findById(previousListID);
            prevList.cards = prevList.cards.filter(card => card.toString() !== id);
            await prevList.save();

            const list = await List.findById(listID);
            list.cards.push(id);
            await list.save();


            const card = await Card.findByIdAndUpdate(id, { listID }, { returnOriginal: false });
            return res.send({ message: 'Success', data: card });
        } catch (e) {
            return res.status(500).send({ message: 'Fail', error: e.message });
        }
    }
}

module.exports = CardController;