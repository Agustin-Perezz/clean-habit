export interface DeleteObjectiveRepository {
  remove(id: string): Promise<void>;
}
