# get_lmp.py

# reference: https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/

from pyiso import client_factory

import sys, json

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    dates = read_in()

    start = dates['startDate']
    end = dates['endDate']

    # print(start + ' ' + end)
    caiso = client_factory('CAISO')

    result = caiso.get_lmp()
    print(result)

if __name__ == '__main__':
    main()
