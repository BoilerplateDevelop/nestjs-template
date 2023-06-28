import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../dto/response.dto';

function checkDataSchema(model) {
  return model
    ? { $ref: getSchemaPath(model) }
    : { nullable: true, type: null };
}

export const ApiGeneralResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return applyDecorators(
    model ? ApiExtraModels(ResponseDto, model) : ApiExtraModels(ResponseDto),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto<TModel>) },
          {
            properties: {
              data: checkDataSchema(model),
            },
          },
        ],
      },
    }),
  );
};
