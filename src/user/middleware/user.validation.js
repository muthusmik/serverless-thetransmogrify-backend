const Joi = require("joi");

const createUserRole = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    role: Joi.string().required(),
  }),
};
 
const addBrandDetails = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    role_id: Joi.number().required(),
    company_name: Joi.string().required(),
    company_email_address: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    company_phone_number: Joi.string().required(),
    store_name: Joi.string().required(),
    store_logo: Joi.string().required(),
    store_website: Joi.string().required(),
    brand_story: Joi.string().required(),
    brand_promo: Joi.string().required(),
    brand_categories: Joi.array().items(Joi.number()),
    brand_values: Joi.array().items(Joi.number()),
  }),
};

const updateBrandDetails = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    role_id: Joi.number().required(),
    company_name: Joi.string().required(),
    company_email_address: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    company_phone_number: Joi.string().required(),
    store_name: Joi.string().required(),
    store_logo: Joi.string().required(),
    store_website: Joi.string().required(),
    brand_story: Joi.string().required(),
    brand_promo: Joi.string().required(),
    brand_categories: Joi.array().items(Joi.number()),
    brand_values: Joi.array().items(Joi.number()),
  }),
};
const addRetailerDetails = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    role_id: Joi.number().required(),
    company_name: Joi.string().required(),
    company_email_address: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    company_phone_number: Joi.string().required(),
    store_name: Joi.string().required(),
    store_logo: Joi.string().required(),
    store_website: Joi.string().required(),
    retailer_story: Joi.string().required(),
    store_photo: Joi.string().required(),
    store_country: Joi.string().required(),
    store_state: Joi.string().required(),
    store_city: Joi.string().required(),
    store_mailing_address: Joi.string().required(),
    retailer_categories: Joi.array().items(Joi.number()),
    retailer_values: Joi.array().items(Joi.number()),
  }),
};
const addBrandShippingDetails = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    brand_id: Joi.number().required(),
    street_address_1: Joi.string().required(),
    street_address_2: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.number().required(),
    shipping_cost: Joi.number().precision(2).required(),
    incremental_fee: Joi.number().precision(2).required(),
    shipping_time_id: Joi.number().required(),
  }),
};
const updateBrandShippingDetails = {
  body: Joi.object().keys({
    brand_id: Joi.number().required(),
    street_address_1: Joi.string().required(),
    street_address_2: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.number().required(),
    shipping_cost: Joi.number().precision(2).required(),
    incremental_fee: Joi.number().precision(2).required(),
    shipping_time_id: Joi.number().required(),
  }),
};

const addBrandReturnDetails = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    brand_id: Joi.number().required(),
    return_type_id: Joi.number().required(),
    street_address_1: Joi.string(),
    street_address_2: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number(),
  }),
};

module.exports = {
  createUserRole,
  addUserPlatform,
  addBrandDetails,
  addBrandShippingDetails,
  addBrandReturnDetails,
  addRetailerDetails,
  updateBrandDetails,
  updateBrandShippingDetails,
};
