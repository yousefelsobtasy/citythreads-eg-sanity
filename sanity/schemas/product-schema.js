const productSchema = {
    name: "product",
    title: "Product",
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
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image" }],
            options: { hotspot: true },
        },
        {
            name: "amount",
            title: "Amount",
            type: "number",
            description: "If there is no variants fill this please so no as not to lead to errors",
        },
        {
            name: "defaultPrice",
            title: "Default Price",
            type: "number",
            validation: (Rule) => Rule.min(0).required(),
        },
        {
            name: "discountPrice",
            title: "Discount Price",
            type: "number",
            description: "Fixed discounted price (leave empty if no discount)",
            validation: (Rule) => Rule.min(0),
        },
        {
            name: "variants",
            title: "Variants",
            type: "array",
            of: [{ type: "variant" }],
        },
    ],
};

export default productSchema;