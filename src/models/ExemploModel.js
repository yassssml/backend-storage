import prisma from '../lib/services/prismaClient.js';

export default class ExemploModel {
    constructor({ id = null, nome, documento = true, foto = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.documento = documento;
        this.foto = foto;
    }

    async criar() {
        return prisma.exemplo.create({
            data: {
                nome: this.nome,
                documento: this.documento,
                foto: this.foto,
            },
        });
    }

    async atualizar() {
        return prisma.exemplo.update({
            where: { id: this.id },
            data: { nome: this.nome, documento: this.documento, foto: this.foto },
        });
    }

    async deletar() {
        return prisma.exemplo.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.documento !== undefined) {
            where.documento = filtros.documento === 'true';
        }
        if (filtros.foto !== undefined) {
            where.foto = parseFloat(filtros.foto);
        }

        return prisma.exemplo.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.exemplo.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ExemploModel(data);
    }
}
