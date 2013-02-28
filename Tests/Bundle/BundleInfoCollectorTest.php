<?php
namespace Arnm\CoreBundle\Tests\Bundle;
/**
 * BundleInfoCollectior test case.
 */
use Arnm\CoreBundle\Bundle\BundleInfoInterface;
use Arnm\CoreBundle\Bundle\BundleInfoCollector;

class InfoMock implements BundleInfoInterface
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

        $info = new InfoMock();
        $return = $collector->register($info);

        $this->assertTrue($return instanceof BundleInfoCollector);
        $this->assertEquals(1, count($collector->getBundleInfos()));
        $this->assertEquals(array($info), $collector->getBundleInfos());
    }

}

