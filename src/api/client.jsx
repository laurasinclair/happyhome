import { useState } from 'react';
import * as Realm from 'realm-web';

const baseUrl = import.meta.env.VITE_MONGODB_BASE_URL;

export const fetchRentalsData = async () => {
    try {
        const appId = import.meta.env.VITE_MONGODB_APP_ID;
        const app = new Realm.App({ id: appId });

        const credentials = Realm.Credentials.anonymous();
        const user = await app.logIn(credentials);

        const mongo = user.mongoClient(import.meta.env.VITE_MONGODB_MONGO_CLIENT);
        const db = mongo.db(import.meta.env.VITE_MONGODB_DATABASE);
        const collection = db.collection(import.meta.env.VITE_MONGODB_COLLECTION);

        const data = await collection.find({});
        return data
    }
    catch (error) {
        console.error('Failed to fetch user data:', error);
    }
};