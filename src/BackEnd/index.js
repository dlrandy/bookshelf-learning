/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const { PORT } = process.env;
const ERASE_DB_ON_SYNC = true;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('rwieruch'),
    };

    next();
});
app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/messages', routes.messages);

app.get('*', (req, res, next) => {
    const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
    error.statusCode = 301;
    next(error);
});

app.use((error, req, res) => {
    if (!error.statusCode) {
        // eslint-disable-next-line no-param-reassign
        error.statusCode = 500;
    }
    if (error.statusCode === 301) {
        return res.status(301).redirect('/not-found');
    }
    return res.status(error.statusCode).json({ error: error.toString() });
});

const createUsersWithMessages = async () => {
    await models.User.create({
        username: 'randy',
    });
    await models.User.create({
        username: 'eric',
    });

    await models.User.create(
        {
            username: 'rwieruch',
            messages: [
                {
                    text: 'Published the Road to learn React',
                },
            ],
        },
        {
            include: [models.Message],
        }
    );

    await models.User.create(
        {
            username: 'ddavids',
            messages: [
                {
                    text: 'Happy to release ...',
                },
                {
                    text: 'Published a complete ...',
                },
            ],
        },
        {
            include: [models.Message],
        }
    );
};

sequelize
    .sync({
        force: ERASE_DB_ON_SYNC,
    })
    .then(() => {
        if (ERASE_DB_ON_SYNC) {
            createUsersWithMessages();
        }
        app.listen(PORT, () => console.log(`app is listening port: ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    });
