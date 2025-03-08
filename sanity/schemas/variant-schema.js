const variantSchema = {
    name: "variant",
    title: "Variant",
    type: "object",
    fields: [
        {
            name: "amount",
            title: "Amount",
            type: "number",
            vaildation: (Rule) => Rule.required()
        },
        {
            name: "color",
            title: "Color",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "size",
            title: "Size",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "variantPrice",
            title: "Variant Price",
            type: "number",
            validation: (Rule) => Rule.min(0),
        },
        {
            name: "variantDiscountPrice",
            title: "Variant Discount Price",
            type: "number",
            description: "Fixed discounted price for this variant (leave empty if no discount)",
            validation: (Rule) => Rule.min(0),
        },
    ],
};

export default variantSchema