# SkillsBriefApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSkillsBriefGet**](#apiskillsbriefget) | **GET** /api/SkillsBrief | |
|[**apiSkillsBriefIdDelete**](#apiskillsbriefiddelete) | **DELETE** /api/SkillsBrief/{id} | |
|[**apiSkillsBriefIdGet**](#apiskillsbriefidget) | **GET** /api/SkillsBrief/{id} | |
|[**apiSkillsBriefIdPut**](#apiskillsbriefidput) | **PUT** /api/SkillsBrief/{id} | |
|[**apiSkillsBriefPost**](#apiskillsbriefpost) | **POST** /api/SkillsBrief | |

# **apiSkillsBriefGet**
> SkillsBriefDtoPagedListResponse apiSkillsBriefGet()


### Example

```typescript
import {
    SkillsBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsBriefApi(configuration);

let skillNameAr: string; // (optional) (default to undefined)
let skillNameEn: string; // (optional) (default to undefined)
let proficiencyLevelAr: string; // (optional) (default to undefined)
let proficiencyLevelEn: string; // (optional) (default to undefined)
let yearsOfExperience: number; // (optional) (default to undefined)
let personalInfoId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiSkillsBriefGet(
    skillNameAr,
    skillNameEn,
    proficiencyLevelAr,
    proficiencyLevelEn,
    yearsOfExperience,
    personalInfoId,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skillNameAr** | [**string**] |  | (optional) defaults to undefined|
| **skillNameEn** | [**string**] |  | (optional) defaults to undefined|
| **proficiencyLevelAr** | [**string**] |  | (optional) defaults to undefined|
| **proficiencyLevelEn** | [**string**] |  | (optional) defaults to undefined|
| **yearsOfExperience** | [**number**] |  | (optional) defaults to undefined|
| **personalInfoId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**SkillsBriefDtoPagedListResponse**

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

# **apiSkillsBriefIdDelete**
> BooleanResponse apiSkillsBriefIdDelete()


### Example

```typescript
import {
    SkillsBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSkillsBriefIdDelete(
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

# **apiSkillsBriefIdGet**
> SkillsBriefDtoResponse apiSkillsBriefIdGet()


### Example

```typescript
import {
    SkillsBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSkillsBriefIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**SkillsBriefDtoResponse**

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

# **apiSkillsBriefIdPut**
> BooleanResponse apiSkillsBriefIdPut()


### Example

```typescript
import {
    SkillsBriefApi,
    Configuration,
    UpdateSkillsBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsBriefApi(configuration);

let id: string; // (default to undefined)
let updateSkillsBriefDto: UpdateSkillsBriefDto; // (optional)

const { status, data } = await apiInstance.apiSkillsBriefIdPut(
    id,
    updateSkillsBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSkillsBriefDto** | **UpdateSkillsBriefDto**|  | |
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

# **apiSkillsBriefPost**
> GuidResponse apiSkillsBriefPost()


### Example

```typescript
import {
    SkillsBriefApi,
    Configuration,
    CreateSkillsBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsBriefApi(configuration);

let createSkillsBriefDto: CreateSkillsBriefDto; // (optional)

const { status, data } = await apiInstance.apiSkillsBriefPost(
    createSkillsBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSkillsBriefDto** | **CreateSkillsBriefDto**|  | |


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

