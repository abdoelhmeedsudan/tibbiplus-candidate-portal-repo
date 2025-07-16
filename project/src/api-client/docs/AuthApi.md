# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAuthLoginPost**](#apiauthloginpost) | **POST** /api/Auth/Login | |

# **apiAuthLoginPost**
> apiAuthLoginPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginModel: LoginModel; // (optional)

const { status, data } = await apiInstance.apiAuthLoginPost(
    loginModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginModel** | **LoginModel**|  | |


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

