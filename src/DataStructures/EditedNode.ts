class EditedNode {
    private _previousNode: EditedNode | null;
    private _body: string;

    constructor(body: string, previousNode: EditedNode | null = null) {
        this._body = body;
        this._previousNode = previousNode;
    }

    get body(): string {
        return this._body;
    }

    get previousNode(): EditedNode | null {
        return this._previousNode;
    }

    set previousNode(node: EditedNode | null) {
        this._previousNode = node;
    }
}

export default EditedNode