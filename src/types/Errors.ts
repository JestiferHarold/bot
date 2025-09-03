function StackOverFlowException(message: string): never {
    throw Error("Stack Over Flow Exception: " + message);
}

function StackUnderFlowException(message: string): never {
    throw Error("Stack Under Flow Exception:" + message);
}

export { StackOverFlowException, StackUnderFlowException };