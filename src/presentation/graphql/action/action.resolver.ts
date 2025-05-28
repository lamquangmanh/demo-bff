// import from libraries
import { Resolver, Query, Args } from '@nestjs/graphql';

// import from domain/entities
import { ActionEntity, GetListArgs } from '@/domain/entites';

// import from use-cases
import { ActionUseCase } from '@/use-cases/action';

// import from presentation
import { GetActionInput, GetActionsResponse } from './dtos';

@Resolver(() => ActionEntity)
export class ActionResolver {
  constructor(private readonly useCase: ActionUseCase) {}

  @Query(() => GetActionsResponse, { name: 'actions' })
  async getActions(@Args() query: GetListArgs): Promise<GetActionsResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (await this.useCase.getActions(query)) as any;
  }

  @Query(() => ActionEntity, { name: 'action' })
  async getAction(@Args() request: GetActionInput): Promise<ActionEntity> {
    return await this.useCase.getAction(request);
  }
}
