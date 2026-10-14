export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class ObjectiveNotFoundError extends DomainError {
  constructor(objectiveId: string) {
    super(
      `Objective with id "${objectiveId}" was not found`,
      "OBJECTIVE_NOT_FOUND",
    );
    this.name = "ObjectiveNotFoundError";
  }
}

export class InvalidObjectiveError extends DomainError {
  constructor(message: string) {
    super(message, "INVALID_OBJECTIVE");
    this.name = "InvalidObjectiveError";
  }
}
