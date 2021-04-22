'use strict';

module.exports = class {
    constructor() {
        this.labels = [];
        this.dataset = [];
    }

    async AddLabel(label) {
        if (await this.labels.find(x => x == label))
            return;
        this.labels.push(label);
    }

    async AddDataset(label, data) {
        if (!label) return;
        console.log(label + ' ' + data);
        const pos = await this.dataset.find(d => d.label == label);
        if (!pos) {
            this.dataset.push({label: label, data: [data]});
        } else {
            this.dataset[pos].data.push(data);
        }
        return;
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