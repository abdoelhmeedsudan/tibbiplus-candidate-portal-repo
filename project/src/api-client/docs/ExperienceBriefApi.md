# ExperienceBriefApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiExperienceBriefGet**](#apiexperiencebriefget) | **GET** /api/ExperienceBrief | |
|[**apiExperienceBriefIdDelete**](#apiexperiencebriefiddelete) | **DELETE** /api/ExperienceBrief/{id} | |
|[**apiExperienceBriefIdGet**](#apiexperiencebriefidget) | **GET** /api/ExperienceBrief/{id} | |
|[**apiExperienceBriefIdPut**](#apiexperiencebriefidput) | **PUT** /api/ExperienceBrief/{id} | |
|[**apiExperienceBriefPost**](#apiexperiencebriefpost) | **POST** /api/ExperienceBrief | |

# **apiExperienceBriefGet**
> ExperienceBriefDtoPagedListResponse apiExperienceBriefGet()


### Example

```typescript
import {
    ExperienceBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperienceBriefApi(configuration);

let companyAr: string; // (optional) (default to undefined)
let companyEn: string; // (optional) (default to undefined)
let jobTitleId: string; // (optional) (default to undefined)
let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)
let personalInfoId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiExperienceBriefGet(
    companyAr,
    companyEn,
    jobTitleId,
    startDate,
    endDate,
    personalInfoId,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **companyAr** | [**string**] |  | (optional) defaults to undefined|
| **companyEn** | [**string**] |  | (optional) defaults to undefined|
| **jobTitleId** | [**string**] |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **personalInfoId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**ExperienceBriefDtoPagedListResponse**

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

# **apiExperienceBriefIdDelete**
> BooleanResponse apiExperienceBriefIdDelete()


### Example

```typescript
import {
    ExperienceBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperienceBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiExperienceBriefIdDelete(
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

# **apiExperienceBriefIdGet**
> ExperienceBriefDtoResponse apiExperienceBriefIdGet()


### Example

```typescript
import {
    ExperienceBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperienceBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiExperienceBriefIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ExperienceBriefDtoResponse**

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

# **apiExperienceBriefIdPut**
> BooleanResponse apiExperienceBriefIdPut()


### Example

```typescript
import {
    ExperienceBriefApi,
    Configuration,
    UpdateExperienceBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperienceBriefApi(configuration);

let id: string; // (default to undefined)
let updateExperienceBriefDto: UpdateExperienceBriefDto; // (optional)

const { status, data } = await apiInstance.apiExperienceBriefIdPut(
    id,
    updateExperienceBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateExperienceBriefDto** | **UpdateExperienceBriefDto**|  | |
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

# **apiExperienceBriefPost**
> GuidResponse apiExperienceBriefPost()


### Example

```typescript
import {
    ExperienceBriefApi,
    Configuration,
    CreateExperienceBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperienceBriefApi(configuration);

let createExperienceBriefDto: CreateExperienceBriefDto; // (optional)

const { status, data } = await apiInstance.apiExperienceBriefPost(
    createExperienceBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createExperienceBriefDto** | **CreateExperienceBriefDto**|  | |


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

