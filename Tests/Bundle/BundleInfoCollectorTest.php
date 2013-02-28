<?php
namespace Arnm\CoreBundle\Tests\Bundle;
/**
 * BundleInfoCollectior test case.
 */
use Arnm\CoreBundle\Bundle\BundleInfo;

use Arnm\CoreBundle\Bundle\BundleInfoCollector;

class InfoMock extends BundleInfo
{
}

class BundleInfoCollectorTest extends \PHPUnit_Framework_TestCase
{

    /**
     * Tests BundleInfoCollectior->register()
     */
    public function testRegister()
    {
        $collector = new BundleInfoCollector();

        $info = new InfoMock('the-key', $collector);

        $this->assertEquals(1, count($collector->getBundleInfos()));
        $this->assertEquals($info, $collector->getBundleInfo('the-key'));
    }

}

