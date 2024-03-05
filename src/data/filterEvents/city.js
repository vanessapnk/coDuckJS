const { connectToCollection } = require("../mongodb");

export async function filterEventsQuery({ category, stacks, stackLevel, languagesSpoken, modality, cities, dates }) {
    try {
        const collection = await connectToCollection("eventData");

        const query = {};

        // Add filters based on provided criteria
        if (category && category.length > 0) {
            query.category = { $in: category };
        }

        if (stacks && stacks.length > 0) {
            query.stacks = { $in: stacks };
        }

        if (stackLevel && stackLevel.length > 0) {
            query.stackLevel = { $in: stackLevel };
        }

        if (languagesSpoken && languagesSpoken.length > 0) {
            query.languagesSpoken = { $all: languagesSpoken };
        }

        if (modality && modality.length > 0) {
            query.modality = { $in: modality };
        }

        if (cities && cities.length > 0) {
            query.city = { $in: cities };
        }

        if (dates && dates.length > 0) {
            query.date = { $in: dates };
        }

        // Execute the query and return the results
        const events = await collection.find(query).toArray();
        return events;
    } catch (error) {
        console.error("Error filtering events:", error);
        throw error; // Rethrow the error for handling higher up
    }
}

module.exports = { filterEventsQuery };
