'use strict';

module.exports = class {
    constructor() {
        this.labels = [];
        this.dataset = [];
    }

    async AddLabel(label) {
        if (!label) return false;
        if (await this.labels.find(x => x == label))
            return true;
        this.labels.push(label);
        return true;
    }

    async AddDataset(label, data) {
        if (!label) return false;
        console.log(label + ' ' + data);
        const pos = await this.dataset.find(d => d.label == label);
        if (!pos) {
            this.dataset.push({label: label, data: [data]});
        } else {
            pos.data.push(data);
        }
        return true;
    }

    async Normalize() {
        const numOfColumn = this.labels;
        await this.dataset.forEach(d => {
            if (d.data.length < numOfColumn) {
                d.data.push(0);
            }
        })
        return;
    }
}