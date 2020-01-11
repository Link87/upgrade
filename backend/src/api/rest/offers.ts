import * as express from 'express';
import { Offer } from '../../models/offer';
import { OfferService } from '../../services/OfferService';

class OfferRoute {

    private readonly router = express.Router();

    constructor(offerService: OfferService) {

        this.router.get('/', async (
            _req: express.Request,
            res: express.Response) => {
                const requestedOffers = await offerService.getOffers();
                res.status(200).contentType('application/json').send(requestedOffers);
        });

        this.router.post('/new', async (
            req: express.Request,
            res: express.Response) => {
                const offer: Offer = req.body;
                const id = await offerService.createOffer(offer);

                res.status(200).contentType('application/json').send({
                    id,
                    status: 'ok',
                });
            });

        this.router.delete('/:id', async (
            req: express.Request,
            res: express.Response) => {
                const id = req.params.id;

                await offerService.deleteOffer(id);
                res.status(200).contentType('application/json').send({
                    status: 'ok',
                });
            });

        this.router.get('/:id', async (
            req: express.Request,
            res: express.Response) => {
                const id = req.params.id;

                const offer = await offerService.getOffer(id);
                res.status(200).contentType('application/json').send(offer);
            });

        this.router.put('/:id', async (
            req: express.Request,
            res: express.Response) => {
                const id = req.params.id;
                const newOffer = req.body;

                if (id !== newOffer.id) {
                    res.status(400).contentType('application/json').send({
                        status: 'bad request',
                    });
                }

                const offer = await offerService.updateOffer(newOffer);
                res.status(200).contentType('application/json').send(offer);
            });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export function offers(offerService: OfferService): express.Router {
    return new OfferRoute(offerService).getRouter();
}

export default offers;
