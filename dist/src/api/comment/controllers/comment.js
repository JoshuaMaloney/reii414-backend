"use strict";
/**
 *  comment controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::comment.comment', ({ strapi }) => ({
    async create(ctx) {
        const creator = ctx.state.user;
        // const data = JSON.parse(ctx.request.body.data);
        // data.creator = creator.id;
        // ctx.request.body.data = JSON.stringify(data);
        const response = await super.create(ctx);
        return response;
    },
    async update(ctx) {
        // @ts-ignore
        const foundComment = await strapi.entityService.findOne('api::comment.comment', ctx.params.id, {
            populate: ["creator"],
        });
        if (foundComment.creator.id !== ctx.state.user.id) {
            return ctx.unauthorized("Unauthorized", { message: "Not allowed" });
        }
        const response = await super.update(ctx);
        return response;
    },
    async delete(ctx) {
        // @ts-ignore
        const foundComment = await strapi.entityService.findOne('api::comment.comment', ctx.params.id, {
            populate: ["creator"],
        });
        if (foundComment.creator.id !== ctx.state.user.id) {
            return ctx.unauthorized("Unauthorized", { message: "Not allowed" });
        }
        const response = await super.delete(ctx);
        return response;
    },
}));
