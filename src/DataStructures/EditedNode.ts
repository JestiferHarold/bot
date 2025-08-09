class EditedNode {
    private previousNode: EditedNode | null;
    private body: string;

    constructor(body: string, previousNode: EditedNode | null = null) {
        this.body = body;
        this.previousNode = previousNode;
    }
}

export default EditedNode