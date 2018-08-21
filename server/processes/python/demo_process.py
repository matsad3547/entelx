# was compute_input.py

import sys, json, numpy as np

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def main():
    lines = read_in()

    # print(lines)

    np_lines = np.array(lines)

    lines_sum = np.sum(np_lines)

    print(lines_sum)

if __name__ == '__main__':
    main()
