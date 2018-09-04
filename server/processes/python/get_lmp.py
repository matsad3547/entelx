# get_lmp.py

# reference: https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/

from pyiso import client_factory

import sys, json, time

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def get_unix_seconds(date_time):
    return int(time.mktime(date_time.timetuple()) * 1000)

def parse_timestamp(dict_with_timestamp):
    dict_with_millis = dict_with_timestamp
    dict_with_millis["timestamp"] = get_unix_seconds(dict_with_timestamp["timestamp"])
    return dict_with_millis

def main():
    params = read_in()

    start_at = params['startDate']
    end_at = params['endDate']
    base_name = params['baseName']

    factory = client_factory(base_name)

    lmp_result = factory.get_lmp(start_at=start_at, end_at=end_at)

    parsed_result = list(map(parse_timestamp, lmp_result))

    json_result = json.dumps(parsed_result)
    print(json_result)

if __name__ == '__main__':
    main()
