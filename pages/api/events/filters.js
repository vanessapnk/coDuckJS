import { connectToCollection } from "@/src/data/mongodb";

export default async function handler(req, res) {
    const { category, stacks, stackLevel, languagesSpoken, modality, city, date, search } = req.query;

    const currentDate = new Date();
    // Construct the aggregation pipeline based on the request body parameters
    const pipeline = [];

    const processQueryParameter = (param, field) => {
        if (param) {
            const paramArray = Array.isArray(param) ? param : [param];
            const regexArray = paramArray.map(value => new RegExp(value.trim(), 'i'));
            pipeline.push({ $match: { [field]: { $in: regexArray } } });
        }
    };

    processQueryParameter(category, 'category');
    processQueryParameter(stackLevel, 'stackLevel');
    processQueryParameter(modality, 'modality');
    processQueryParameter(city, 'city');
    processQueryParameter(date, 'date');

    // Search in arrays using $elemMatch
    if (stacks) {
        const stackArray = Array.isArray(stacks) ? stacks : [stacks];
        const caseInsensitiveRegexArray = stackArray.map(value => new RegExp(value.trim(), 'i'));
        pipeline.push({ $match: { stacks: { $elemMatch: { $in: caseInsensitiveRegexArray } } } });
    }
    
    if (languagesSpoken) {
        const languagesSpokenArray = Array.isArray(languagesSpoken) ? languagesSpoken : [languagesSpoken];
        const caseInsensitiveRegexArray = languagesSpokenArray.map(value => new RegExp(value.trim(), 'i'));
        pipeline.push({ $match: { languagesSpoken: { $elemMatch: { $in: caseInsensitiveRegexArray } } } });
    }

    // Construct the $or condition for searching in multiple fields
    const orConditions = [];

    if (search) {
        const searchRegex = new RegExp(search.trim(), 'i');
        orConditions.push(
            { name: { $regex: searchRegex } },
            { category: { $regex: searchRegex } },
            { stackLevel: { $regex: searchRegex } },
            { modality: { $regex: searchRegex } },
            { city: { $regex: searchRegex } },
            { stacks: { $regex: searchRegex } },
            { languagesSpoken: { $regex: searchRegex } },
            { date: { $regex: searchRegex } }
        );
    }
    
    // Push $or condition to pipeline if there are any conditions
    if (orConditions.length > 0) {
        pipeline.push({ $match: { $or: orConditions } });
    }
    
    pipeline.push({
        $match: {
            $expr: { $lt: [{ $size: "$participants" }, "$usersLimit"] },
            "date.$date": { $gte: currentDate }
        }
    })
    
    try {
        const collection = await connectToCollection("eventData");

        // Execute the aggregation pipeline
        const result = await collection.aggregate(pipeline).toArray();
        console.log(currentDate)
        res.status(200).json(result);
    } catch (error) {
        console.error('Error querying groups:', error);
        res.status(500).json({ error: 'Failed to query groups' });
    }
}