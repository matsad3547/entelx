# get_lmp.py

from pyiso import client_factory


def read_in():
    lines = sys.stdin.readlines()
    # print(lines)
    return json.loads(lines[0])

def main():
    caiso = client_factory('CAISO')
    # start = read_in()
    result = caiso.get_lmp()
    print(result)




if __name__ == '__main__':
    main()
