const collectionSchema = {
    name: "collection",
    title: "Collection",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "collectionImage",
            title: "Collection Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "products",
            title: "Products",
            type: "array",
            of: [{ type: "reference", to: [{ type: "product" }] }],
        },
    ],
};

export default collectionSchema;