class BaseController {
    constructor(responseService, service, dto) {
        this.responseService = responseService;
        this.service = service;
        this.dto = dto;

        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.query = this.query.bind(this);
    }

    async create(req, res) {
        try {
            const createDto = this.dto.create(req.body);
            const record = await this.service.create(createDto);
            this.responseService.created(req, res, record);
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }

    async update(req, res) {
        try {
            const updateDto = this.dto.update(req.body);
            const { id } = req.params;

            const record = await this.service.update(id, updateDto);

            if (record) {
                this.responseService.updated(req, res, record);
            } else {
                this.responseService.notFound(req, res);
            }
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            const record = await this.service.getById(id);

            if (record) {
                this.responseService.success(req, res, record);
            } else {
                this.responseService.notFound(req, res);
            }
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const returnObj = await this.service.delete(id);

            if (returnObj.isDeleted) {
                delete returnObj.isDeleted;
                res.data = returnObj;
                this.responseService.deleted(req, res);
            } else {
                delete returnObj.isDeleted;
                res.data = returnObj;
                this.responseService.notFound(req, res);
            }
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }

    async query(req, res) {
        try {
            const queryDto = this.dto.query(req.body);

            const records = await this.service.query(queryDto);
            this.responseService.success(req, res, records);
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }
}

module.exports = BaseController;
