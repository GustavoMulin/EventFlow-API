import mongoose from 'mongoose';

const db = mongoose.connect('mongodb+srv://gustavobarbosa7824_db_user:hjOUFpLYOkQGST2N@cluster0.nqjcoje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Mongo ok'));

export default db;