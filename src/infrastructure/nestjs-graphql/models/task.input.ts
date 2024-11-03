import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  name!: string;
}

@InputType()
export class UpdateTaskNameInput {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;
}
