#include <Windows.h>
#include <stdio.h>

#include <string>
using namespace std;

#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"
using namespace rapidjson;

extern "C" __declspec(dllexport) const char* get_info() {
    Document d;
    d.SetObject();

    char user_name_buf[512];
    DWORD user_name_size = 512;
    GetUserNameA(user_name_buf, &user_name_size);

    Value user_name;
    user_name.SetString(StringRef(user_name_buf));
    d.AddMember("user_name", user_name, d.GetAllocator());

    Value time_stamp = Value();
    time_stamp.SetInt64(GetTickCount64());
    d.AddMember("time_stamp", time_stamp, d.GetAllocator());

    StringBuffer out_buf;
    Writer<StringBuffer> writer(out_buf);
    d.Accept(writer);
    return out_buf.GetString();
}

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
        break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

