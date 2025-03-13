import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "d3jjeys1",
  dataset: "production",
  apiVersion: "2024-03-05",
  useCdn: false, // Disable CDN for fresh data
});

// Fetch all products
export async function getAllProducts() {
  const query = `*[_type == "product"]{
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    description,
    "images": images[]{
      "_key": _key,
      "imgUrl": asset->url
    },
    defaultPrice,
    discountPrice,
    amount,
    "variants": variants[]{
      _key,
      _type,
      amount,
      size,
      color,
      "images": images[]{
        "_key": _key,
        "imgUrl": asset->url
      },
      variantDiscountPrice,
      variantPrice
    }
  }`;
  return await client.fetch(query);
}

// Fetch a single product by ID
export async function getProductById(id) {
  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    _createdAt,
    _type,
    title,
    "slug": slug.current,
    description,
    "images": images[]{
      "_key": _key,
      _type,
      "imgUrl": asset->url
    },
    defaultPrice,
    discountPrice,
    amount,
    "variants": variants[]{
      _key,
      _type,
      amount,
      size,
      color,
      "images": images[]{
        "_key": _key,
        _type,
        "imgUrl": asset->url
      },
      variantDiscountPrice,
      variantPrice
    }
  }`;
  return await client.fetch(query, { id });
}

// Fetch a product by slug
export async function getProductBySlug(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    title,
    "slug": slug.current,
    description,
    "images": images[]{
      "_key": _key,
      _type,
      "imgUrl": asset->url
    },
    defaultPrice,
    discountPrice,
    amount,
    "variants": variants[]{
      _key,
      _type,
      amount,
      size, 
      color,
      "images": images[]{
        "_key": _key,
        _type,
        "imgUrl": asset->url
      },
      variantDiscountPrice,
      variantPrice
    }
  }`;
  return await client.fetch(query, { slug });
}

// Fetch all collections
export async function getAllCollections() {
  const query = `*[_type == "collection"]{
    _id,
    _createdAt,
    _type,
    title,
    "slug": slug.current,
    "collectionImage": collectionImage.asset->url,
    products
  }`;
  return await client.fetch(query);
}

// Fetch a single collection by slug
export async function getCollectionBySlug(slug) {
  const query = `*[_type == "collection" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    title,
    "slug": slug.current,
    "collectionImage": collectionImage.asset->url,
    products
  }`;
  return await client.fetch(query, { slug });
}
