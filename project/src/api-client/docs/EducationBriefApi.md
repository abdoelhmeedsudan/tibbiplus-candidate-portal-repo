# EducationBriefApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEducationBriefGet**](#apieducationbriefget) | **GET** /api/EducationBrief | |
|[**apiEducationBriefIdDelete**](#apieducationbriefiddelete) | **DELETE** /api/EducationBrief/{id} | |
|[**apiEducationBriefIdGet**](#apieducationbriefidget) | **GET** /api/EducationBrief/{id} | |
|[**apiEducationBriefIdPut**](#apieducationbriefidput) | **PUT** /api/EducationBrief/{id} | |
|[**apiEducationBriefPost**](#apieducationbriefpost) | **POST** /api/EducationBrief | |

# **apiEducationBriefGet**
> EducationBriefDtoPagedListResponse apiEducationBriefGet()


### Example

```typescript
import {
    EducationBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EducationBriefApi(configuration);

let institutionAr: string; // (optional) (default to undefined)
let institutionEn: string; // (optional) (default to undefined)
let degreeAr: string; // (optional) (default to undefined)
let degreeEn: string; // (optional) (default to undefined)
let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)
let personalInfoId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEducationBriefGet(
    institutionAr,
    institutionEn,
    degreeAr,
    degreeEn,
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
| **institutionAr** | [**string**] |  | (optional) defaults to undefined|
| **institutionEn** | [**string**] |  | (optional) defaults to undefined|
| **degreeAr** | [**string**] |  | (optional) defaults to undefined|
| **degreeEn** | [**string**] |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **personalInfoId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**EducationBriefDtoPagedListResponse**

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

# **apiEducationBriefIdDelete**
> BooleanResponse apiEducationBriefIdDelete()


### Example

```typescript
import {
    EducationBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EducationBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiEducationBriefIdDelete(
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

# **apiEducationBriefIdGet**
> EducationBriefDtoResponse apiEducationBriefIdGet()


### Example

```typescript
import {
    EducationBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EducationBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiEducationBriefIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**EducationBriefDtoResponse**

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

# **apiEducationBriefIdPut**
> BooleanResponse apiEducationBriefIdPut()


### Example

```typescript
import {
    EducationBriefApi,
    Configuration,
    UpdateEducationBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EducationBriefApi(configuration);

let id: string; // (default to undefined)
let updateEducationBriefDto: UpdateEducationBriefDto; // (optional)

const { status, data } = await apiInstance.apiEducationBriefIdPut(
    id,
    updateEducationBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEducationBriefDto** | **UpdateEducationBriefDto**|  | |
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

# **apiEducationBriefPost**
> GuidResponse apiEducationBriefPost()


### Example

```typescript
import {
    EducationBriefApi,
    Configuration,
    CreateEducationBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EducationBriefApi(configuration);

let createEducationBriefDto: CreateEducationBriefDto; // (optional)

const { status, data } = await apiInstance.apiEducationBriefPost(
    createEducationBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEducationBriefDto** | **CreateEducationBriefDto**|  | |


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

