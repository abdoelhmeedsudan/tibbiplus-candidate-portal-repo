# SpecializationDtoPagedList


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**currentPage** | **number** |  | [optional] [default to undefined]
**totalPages** | **number** |  | [optional] [default to undefined]
**pageSize** | **number** |  | [optional] [default to undefined]
**totalCount** | **number** |  | [optional] [default to undefined]
**hasPrevious** | **boolean** |  | [optional] [readonly] [default to undefined]
**hasNext** | **boolean** |  | [optional] [readonly] [default to undefined]
**items** | [**Array&lt;SpecializationDto&gt;**](SpecializationDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { SpecializationDtoPagedList } from './api';

const instance: SpecializationDtoPagedList = {
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    hasPrevious,
    hasNext,
    items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
