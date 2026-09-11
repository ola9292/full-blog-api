import 'dotenv/config';
import mongoose from 'mongoose';

async function runMigration() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB...');

        // Access the native MongoDB collection directly (replace 'notes' with your exact collection name if different)
        const collection = mongoose.connection.db.collection('notes');

        const result = await collection.updateMany(
            { user_id: { $exists: true } }, 
            { $rename: { "user_id": "user" } }
        );

        console.log('Migration complete:', result);
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

runMigration();