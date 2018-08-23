import unittest

import sys

sys.path.append('../demo_process')

import demo_process

class TestDemoProcess(unittest.TestCase)

    def setup(self):
        pass

    def test_demo_process(self):
        demo_process.read_in = lambda _: [1, 2, 3]
        m = demo_process.main()
        self.assertEquals(m, 6)

if __name__ == '__main__':
    unittest.main()
