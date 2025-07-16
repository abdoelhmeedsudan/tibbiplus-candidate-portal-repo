# PersonalInfoDtoResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**httpStatusCode** | [**HttpStatusCode**](HttpStatusCode.md) |  | [optional] [default to undefined]
**succeeded** | **boolean** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**errors** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**modelErrors** | **{ [key: string]: Array&lt;string&gt; | null; }** |  | [optional] [default to undefined]
**data** | [**PersonalInfoDto**](PersonalInfoDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { PersonalInfoDtoResponse } from './api';

const instance: PersonalInfoDtoResponse = {
    httpStatusCode,
    succeeded,
    message,
    errors,
    modelErrors,
    data,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
