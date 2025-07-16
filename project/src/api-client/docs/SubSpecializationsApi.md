# SubSpecializationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSubSpecializationsGet**](#apisubspecializationsget) | **GET** /api/SubSpecializations | |
|[**apiSubSpecializationsIdDelete**](#apisubspecializationsiddelete) | **DELETE** /api/SubSpecializations/{id} | |
|[**apiSubSpecializationsIdGet**](#apisubspecializationsidget) | **GET** /api/SubSpecializations/{id} | |
|[**apiSubSpecializationsIdPut**](#apisubspecializationsidput) | **PUT** /api/SubSpecializations/{id} | |
|[**apiSubSpecializationsPost**](#apisubspecializationspost) | **POST** /api/SubSpecializations | |

# **apiSubSpecializationsGet**
> SubSpecializationDtoPagedListResponse apiSubSpecializationsGet()


### Example

```typescript
import {
    SubSpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubSpecializationsApi(configuration);

let searchTerm: string; // (optional) (default to undefined)
let specializationId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiSubSpecializationsGet(
    searchTerm,
    specializationId,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **searchTerm** | [**string**] |  | (optional) defaults to undefined|
| **specializationId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**SubSpecializationDtoPagedListResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSubSpecializationsIdDelete**
> BooleanResponse apiSubSpecializationsIdDelete()


### Example

```typescript
import {
    SubSpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubSpecializationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSubSpecializationsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**BooleanResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSubSpecializationsIdGet**
> SubSpecializationDtoResponse apiSubSpecializationsIdGet()


### Example

```typescript
import {
    SubSpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubSpecializationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSubSpecializationsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**SubSpecializationDtoResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSubSpecializationsIdPut**
> BooleanResponse apiSubSpecializationsIdPut()


### Example

```typescript
import {
    SubSpecializationsApi,
    Configuration,
    UpdateSubSpecializationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SubSpecializationsApi(configuration);

let id: string; // (default to undefined)
let updateSubSpecializationDto: UpdateSubSpecializationDto; // (optional)

const { status, data } = await apiInstance.apiSubSpecializationsIdPut(
    id,
    updateSubSpecializationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSubSpecializationDto** | **UpdateSubSpecializationDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**BooleanResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSubSpecializationsPost**
> GuidResponse apiSubSpecializationsPost()


### Example

```typescript
import {
    SubSpecializationsApi,
    Configuration,
    CreateSubSpecializationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SubSpecializationsApi(configuration);

let createSubSpecializationDto: CreateSubSpecializationDto; // (optional)

const { status, data } = await apiInstance.apiSubSpecializationsPost(
    createSubSpecializationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSubSpecializationDto** | **CreateSubSpecializationDto**|  | |


### Return type

**GuidResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

